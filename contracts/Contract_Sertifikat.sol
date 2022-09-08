pragma solidity >=0.4.21 <0.7.0;

contract Contract_Sertifikat {
    string public name;
    uint256 public user_count = 0;
    uint256 public sertifikat_count = 0;
    mapping(uint256 => User) public users;
    mapping(uint256 => Sertifikat) public sertifikats;
    uint256[] private list_user;
    uint256[] private list_sertifikat;

    struct User {
        uint256 id;
        string name;
        uint256 no_user;
        address payable owner;
    }
    struct Sertifikat {
        uint256 ids;
        uint256 nik;
        uint256 no_user;
        string alamat;
        string kota;
        string prov;
        bytes32 hash_sertifikat;
        address payable owner;
    }
    event UserCreated(
        uint256 id,
        string name,
        uint256 no_user,
        address payable owner
    );
    event SertifikatCreated(
        uint256 ids,
        uint256 nik,
        uint256 no_user,
        string alamat,
        string kota,
        string prov,
        bytes32 hash_sertifikat,
        address payable owner
    );

    constructor() public {
        name = "Sertifikat Voting Digital";
    }

    function createUser(string memory _name, uint256 _no_user) public {
        bool duplicate = false;
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_no_user > 0);
        for (uint256 i = 0; i < list_user.length; i++) {
            if (list_user[i] == _no_user) {
                duplicate = true;
            }
        }
        if (duplicate == false) {
            list_user.push(_no_user);
            // Increment product count
            user_count++;
            // Create the product
            users[user_count] = User(user_count, _name, _no_user, msg.sender);
            // Trigger an event
            emit UserCreated(user_count, _name, _no_user, msg.sender);
        }
    }

    function createSertif(
        uint256 _nik,
        uint256 _no_user,
        string memory _alamat,
        string memory _kota,
        string memory _prov
    ) public {
        bool duplicate = false;
        bool user_exist = false;
        require(_nik > 0);
        require(_no_user > 0);
        require(bytes(_alamat).length > 0);
        require(bytes(_kota).length > 0);
        require(bytes(_prov).length > 0);
        for (uint256 i = 0; i < list_user.length; i++) {
            if (list_user[i] == _no_user) {
                user_exist = true;
            }
        }
        for (uint256 i = 0; i < list_sertifikat.length; i++) {
            if (list_sertifikat[i] == _nik) {
                duplicate = true;
            }
        }
        if ((duplicate == false) && (user_exist == true)) {
            list_sertifikat.push(_nik);
            sertifikat_count++;
            uint256 plain_text = _nik + _no_user;
            bytes32 _hash_sertifikat = hash(plain_text);
            sertifikats[sertifikat_count] = Sertifikat(
                sertifikat_count,
                _nik,
                _no_user,
                _alamat,
                _kota,
                _prov,
                _hash_sertifikat,
                msg.sender
            );
            emit SertifikatCreated(
                sertifikat_count,
                _nik,
                _no_user,
                _alamat,
                _kota,
                _prov,
                _hash_sertifikat,
                msg.sender
            );
        }
    }

    function hash(uint256 plain) private view returns (bytes32) {
        return sha256(abi.encodePacked(plain));
    }
}
