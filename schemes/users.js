const z = require('zod');

const userSchema = z.object({
    id_user: z.number({
        invalid_type_error: "Id User must be a CC",
        required_error: "User Id is required"
    }).int(),
    name: z.string({
        invalid_type_error: "Name of the User must be a string",
        required_error: "Name of the user    is required"
    }),
    last: z.string({
        invalid_type_error: "User last must be a String",
        required_error: "User last is required"
    }).default("Unknown"),
    email: z.string({
        invalid_type_error: 'User email must be correctly formated',
        required_error: 'User email is required'
    }).email({message:"are you sure that is a email?"})
})
function validateUser(obj){
    return userSchema.safeParse(obj)
}

module.exports = {
    validateUser
}