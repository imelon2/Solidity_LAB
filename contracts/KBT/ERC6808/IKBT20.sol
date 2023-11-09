// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.17;

interface IKBT20 {
    event AccountSecured(address _account, uint256 _amount);
    event AccountResetBinding(address _account);
    event SafeFallbackActivated(address _account);
    event AccountEnabledTransfer(
        address _account,
        uint256 _amount,
        uint256 _time,
        address _to,
        bool _allFunds
    );
    event AccountEnabledApproval(
        address _account,
        uint256 _time,
        uint256 _numberOfTransfers
    );

    /**
     * @notice Transfer 시, to가 최초로 Holder가 될때 발생하는 event
     * @param _account: 수신자(to) address
     * @param _amount: 수신자(to)가 받는 금액
     */
    event Ingress(address _account, uint256 _amount);

    /**
     * @notice Transfer 시, 송금자 토큰을 모두 이제하고 잔액이 없을 때 발생하는 event
     * @param _account: 송금자(from) address
     * @param _amount: 송금자(from)가 마지막으로 보내는 금액
     */
    event Egress(address _account, uint256 _amount);

    struct AccountHolderBindings {
        address firstWallet;
        address secondWallet;
    }

    struct FirstAccountBindings {
        address accountHolderWallet;
        address secondWallet;
    }

    struct SecondAccountBindings {
        address accountHolderWallet;
        address firstWallet;
    }

    struct TransferConditions {
        uint256 amount;
        uint256 time;
        address to;
        bool allFunds;
    }

    struct ApprovalConditions {
        uint256 time;
        uint256 numberOfTransfers;
    }

    function addBindings(
        address _keyWallet1,
        address _keyWallet2
    ) external returns (bool);

    function getBindings(
        address _account
    ) external view returns (AccountHolderBindings memory);

    function resetBindings() external returns (bool);

    function safeFallback() external returns (bool);

    function allowTransfer(
        uint256 _amount,
        uint256 _time,
        address _to,
        bool _allFunds
    ) external returns (bool);

    function getTransferableFunds(
        address _account
    ) external view returns (TransferConditions memory);

    function allowApproval(
        uint256 _time,
        uint256 _numberOfTransfers
    ) external returns (bool);

    function getApprovalConditions(
        address account
    ) external view returns (ApprovalConditions memory);

    function getNumberOfTransfersAllowed(
        address _account,
        address _spender
    ) external view returns (uint256);

    function isSecureWallet(address _account) external view returns (bool);
}