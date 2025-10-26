// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CeloSave is ReentrancyGuard {
    IERC20 public cUSD;
    
    struct SavingsGoal {
        uint256 id;
        address user;
        string name;
        uint256 targetAmount;
        uint256 currentAmount;
        uint256 deadline;
        uint256 createdAt;
        bool isActive;
        uint256 streak;
        uint256 lastSaveTimestamp;
    }
    
    mapping(address => SavingsGoal[]) public userGoals;
    mapping(address => uint256) public userStreaks;
    uint256 public nextGoalId = 1;
    
    event GoalCreated(address indexed user, uint256 goalId, string name, uint256 targetAmount);
    event SavedToGoal(address indexed user, uint256 goalId, uint256 amount);
    event Withdrawn(address indexed user, uint256 goalId, uint256 amount);
    event GoalCompleted(address indexed user, uint256 goalId);
    event GoalDeleted(address indexed user, uint256 goalId);
    
    constructor(address _cUSDAddress) {
        cUSD = IERC20(_cUSDAddress);
    }
    
    function createSavingsGoal(
        string memory _name,
        uint256 _targetAmount,
        uint256 _deadline
    ) external {
        require(_targetAmount > 0, "Target amount must be greater than 0");
        require(_deadline > block.timestamp, "Deadline must be in the future");
        
        SavingsGoal memory newGoal = SavingsGoal({
            id: nextGoalId,
            user: msg.sender,
            name: _name,
            targetAmount: _targetAmount,
            currentAmount: 0,
            deadline: _deadline,
            createdAt: block.timestamp,
            isActive: true,
            streak: 0,
            lastSaveTimestamp: 0
        });
        
        userGoals[msg.sender].push(newGoal);
        emit GoalCreated(msg.sender, nextGoalId, _name, _targetAmount);
        nextGoalId++;
    }
    
    function saveToGoal(uint256 _goalId, uint256 _amount) external nonReentrant {
        require(_amount > 0, "Amount must be greater than 0");
        
        SavingsGoal storage goal = _getGoal(msg.sender, _goalId);
        require(goal.isActive, "Goal is not active");
        require(block.timestamp <= goal.deadline, "Goal deadline has passed");
        
        // Transfer cUSD from user to contract
        require(cUSD.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        
        goal.currentAmount += _amount;
        
        // Update streak if saving daily
        if (block.timestamp - goal.lastSaveTimestamp >= 1 days) {
            goal.streak++;
            userStreaks[msg.sender]++;
        }
        goal.lastSaveTimestamp = block.timestamp;
        
        // Check if goal is completed
        if (goal.currentAmount >= goal.targetAmount) {
            goal.isActive = false;
            emit GoalCompleted(msg.sender, _goalId);
        }
        
        emit SavedToGoal(msg.sender, _goalId, _amount);
    }
    
    function withdraw(uint256 _goalId, uint256 _amount) external nonReentrant {
        require(_amount > 0, "Amount must be greater than 0");
        
        SavingsGoal storage goal = _getGoal(msg.sender, _goalId);
        require(goal.currentAmount >= _amount, "Insufficient balance");
        
        goal.currentAmount -= _amount;
        
        // Transfer cUSD from contract to user
        require(cUSD.transfer(msg.sender, _amount), "Transfer failed");
        
        emit Withdrawn(msg.sender, _goalId, _amount);
    }
    
    function deleteGoal(uint256 _goalId) external nonReentrant {
        SavingsGoal storage goal = _getGoal(msg.sender, _goalId);
        
        // Refund any saved amount
        if (goal.currentAmount > 0) {
            uint256 refundAmount = goal.currentAmount;
            goal.currentAmount = 0;
            require(cUSD.transfer(msg.sender, refundAmount), "Refund failed");
        }
        
        // Remove goal from array
        SavingsGoal[] storage goals = userGoals[msg.sender];
        for (uint256 i = 0; i < goals.length; i++) {
            if (goals[i].id == _goalId) {
                goals[i] = goals[goals.length - 1];
                goals.pop();
                break;
            }
        }
        
        emit GoalDeleted(msg.sender, _goalId);
    }
    
    function getUserGoals(address _user) external view returns (SavingsGoal[] memory) {
        return userGoals[_user];
    }
    
    function getTotalSavings(address _user) external view returns (uint256) {
        SavingsGoal[] memory goals = userGoals[_user];
        uint256 total = 0;
        for (uint256 i = 0; i < goals.length; i++) {
            total += goals[i].currentAmount;
        }
        return total;
    }
    
    function getUserStreak(address _user) external view returns (uint256) {
        return userStreaks[_user];
    }
    
    function _getGoal(address _user, uint256 _goalId) private view returns (SavingsGoal storage) {
        SavingsGoal[] storage goals = userGoals[_user];
        for (uint256 i = 0; i < goals.length; i++) {
            if (goals[i].id == _goalId) {
                return goals[i];
            }
        }
        revert("Goal not found");
    }
}
