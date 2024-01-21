// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


contract CryptoCoffeeCart {
    address payable private reciever;

    uint256 items;

    struct Coffees {
        uint256 id;
        string name;
        string message;
        uint256 amount;
        address senderAddress;
        uint time;
    }
    mapping(uint256 => Coffees) private coffees;
    mapping(address => Coffees) private coffeeSender;

    constructor() {
        reciever = payable(msg.sender);
    }

    receive() external payable {}

    function buyCoffee(string memory _name, string memory _message)
        external
        payable
    {
        require(msg.value != 0, "Please Give add some value");
        require(msg.sender != reciever);
        uint256 itemId;
        address _sender = msg.sender;
        if (coffeeSender[_sender].senderAddress == address(0)) {
            items += 1;
            itemId = items;
            coffees[itemId] = Coffees(
                itemId,
                _name,
                _message,
                msg.value,
                _sender,
                block.timestamp
            );
            coffeeSender[_sender] = Coffees(
                itemId,
                _name,
                _message,
                msg.value,
                _sender,
                block.timestamp
            );
        } else {
            itemId = coffeeSender[_sender].id;
            uint256 amountDonated = coffees[itemId].amount;
            coffees[itemId].amount = (msg.value + amountDonated);
            coffeeSender[_sender].amount = (msg.value + amountDonated);
        }
        reciever.transfer(msg.value);
    }

    function getCoffees() external view returns (Coffees[] memory) {
        uint256 totalItems = items + 1;
        Coffees[] memory allCoffees = new Coffees[](totalItems);
        for (uint i = 0; i < totalItems; i++) {
            Coffees storage coffee = coffees[i];
            allCoffees[i] = coffee;
        }
        return allCoffees;
    }

    function getDonation(address _sender)
        external
        view
        returns (Coffees memory)
    {
        return coffeeSender[_sender];
    }
}
