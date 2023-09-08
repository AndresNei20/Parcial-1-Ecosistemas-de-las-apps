const z = require('zod');

const characterSchema = z.object({
    id_charac: z.number({
        invalid_type_error: "Character ID must be a number",
        required_error: "Character ID is required"
    }).int(),
    name: z.string({
        invalid_type_error: "Name of the Character must be a string",
        required_error: "Name of the Character is required"
    }),
    level: z.number({
        invalid_type_error: "Character level must be a number",
        required_error: "Character level is required"
    }).int(),
    type: z.string({
        invalid_type_error: "Type of the character must be a string",
        required_error: "type of the Character is required"
    }),
    id_user: z.number({
        invalid_type_error: "Character ID must be the same that the Users id",
        required_error: "User ID is required"
    }).int(),

})
function validateCharacter(obj){
    return characterSchema.safeParse(obj)
}

module.exports = {
    validateCharacter
}