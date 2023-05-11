// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonationToken {
    string public name;
    string public symbol;
    uint8 public decimals = 18; // 18 decimals is the standard
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    address public owner;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    event Donation(
        address indexed donor,
        address indexed receiver,
        uint256 value,
        uint256 date
    );

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    function _transfer(address _from, address _to, uint256 _value) internal {
        require(_to != address(0), "ERC20: transfer to the zero address");
        require(
            balanceOf[_from] >= _value,
            "ERC20: transfer amount exceeds balance"
        );
        require(
            balanceOf[_to] + _value >= balanceOf[_to],
            "ERC20: transfer overflow"
        );
        uint256 previousBalances = balanceOf[_from] + balanceOf[_to];
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
        assert(balanceOf[_from] + balanceOf[_to] == previousBalances);
    }

    function transfer(
        address _to,
        uint256 _value
    ) public returns (bool success) {
        _transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(
        address _spender,
        uint256 _value
    ) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(
            _value <= allowance[_from][msg.sender],
            "ERC20: transfer amount exceeds allowance"
        );
        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);
        return true;
    }

    function donate(
        address _receiver,
        uint256 _value,
        uint256 _date
    ) public returns (bool success) {
        _transfer(msg.sender, _receiver, _value);
        emit Donation(msg.sender, _receiver, _value, _date);
        return true;
    }

    function mint(address _to, uint256 _amount) public onlyOwner {
        totalSupply += _amount;
        balanceOf[_to] += _amount;
        emit Transfer(address(0), _to, _amount);
    }
}
