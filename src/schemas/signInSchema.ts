import {z} from 'zod'

export  const signInSchema=z.object({
    identefier:z.string(),
    password:z.string()
})