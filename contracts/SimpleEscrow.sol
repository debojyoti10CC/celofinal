// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleEscrow {
    address payable public client;
    address payable public freelancer;
    uint256 public amount;
    enum State { Funded, Completed, Cancelled }
    State public currentState;

    event FundsDeposited(address indexed client, address indexed freelancer, uint256 amount);
    event FundsReleased(address indexed client, address indexed freelancer, uint256 amount);
    event EscrowCancelled(address indexed client, address indexed freelancer, uint256 amount);

    error NotClient();
    error InvalidState();
    error TransferFailed();

    constructor(address payable _freelancer) payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        require(_freelancer != address(0), "Freelancer address cannot be zero");
        require(_freelancer != msg.sender, "Freelancer cannot be the client");

        client = payable(msg.sender);
        freelancer = _freelancer;
        amount = msg.value;
        currentState = State.Funded;
        emit FundsDeposited(client, freelancer, amount);
    }

    function releaseFunds() external {
        if (msg.sender != client) revert NotClient();
        if (currentState != State.Funded) revert InvalidState();

        currentState = State.Completed;
        (bool success, ) = freelancer.call{value: amount}("");
        if (!success) {
            currentState = State.Funded;
            revert TransferFailed();
        }
        emit FundsReleased(client, freelancer, amount);
    }

    function cancelEscrow() external {
        if (msg.sender != client) revert NotClient();
        if (currentState != State.Funded) revert InvalidState();

        currentState = State.Cancelled;
        (bool success, ) = client.call{value: amount}("");
        if (!success) {
            currentState = State.Funded;
            revert TransferFailed();
        }
        emit EscrowCancelled(client, freelancer, amount);
    }
}
