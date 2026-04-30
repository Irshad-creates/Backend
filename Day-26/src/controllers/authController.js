export async function userRegisteration(req, res, next) {

    try {
        throw new Error("password is too weak")
    } catch (err) {
        err.status = 400
        next(err)
    }

}
