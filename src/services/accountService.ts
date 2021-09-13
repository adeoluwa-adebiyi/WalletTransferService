import { Account } from "../models/account";
import { UserAccountBalance } from "../processors/messages/UserAccountBalance";
import AccountRepo from "../repos/account";

export interface AccountService{
    processUserAccountBalanceMessage(message: UserAccountBalance): Promise<void>;
}

export class AccountServiceImpl implements AccountService{

    async processUserAccountBalanceMessage(message: UserAccountBalance): Promise<void> {
        await AccountRepo.updateAccount(<Account>{
            balance: message.balance,
            userId: message.userId.toString(),
            walletId: message.walletId.toString(),
        })
    }

}

export default new AccountServiceImpl();