import {z} from 'zod'

export  const messageSchema =z.object({
    content:z.string().min(10,{message:"Content must ba atleast of 10"})
    .max(300,{message:"Content must not exclude limti of 300  letters"})
}) ;