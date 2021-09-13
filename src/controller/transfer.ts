import transferService from "../services/transferService";

export const authorizeTransferRequest = async(req:any, res:any) => {

    try{

        const { requestId } = req.params;

        if(!requestId){
            throw Error("requestId is required");
        }

        const params = await transferService.processTransfer(requestId);

        res.json({
            requestId: params.transferRequestId
        });

    }catch(e){
        res.json({
            status: "failure",
            error: e.message
        })
    }

}

export default {
    authorizeTransferRequest
}