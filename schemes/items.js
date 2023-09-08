const z = require('zod');

const itemSchema = z.object({
    id_item: z.number({
        invalid_type_error: "Item ID must be a number",
        required_error: "Item ID is required"
    }).int(),
    name: z.string({
        invalid_type_error: "Name of the Character must be a string",
        required_error: "Name of the Character is required"
    }),
    item_type: z.string({
        invalid_type_error: "Item Type of the item must be a string",
        required_error: "Type of the item is required"
    }),
    mode: z.string({
        invalid_type_error: "Mode of the item must be a string",
        required_error: "Mode of the Item is required"
    }),
    id_charac: z.number({
        invalid_type_error: "Character Id must be the same that the character",
        required_error: "Character ID is required"
    }).int(),


})
function validateItem(obj){
    return itemSchema.safeParse(obj)
}

module.exports = {
    validateItem
}