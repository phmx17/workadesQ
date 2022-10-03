// check if user or email has already been taken

import axios from 'axios'

export const registerApiValidate = async(field, payload) => {
	switch(field) {
		case 'username':
			const optionsUsername = {
				method: 'post',
				url: "http://localhost:5000/api/v1/users/validate",
				data: {field, payload}        
			}
			try {            
				const reply = await axios(optionsUsername)
				return reply.data
			} catch (err) { 
        console.log(err)        
        return "400 bad request"
			}
		case 'email':
			const optionsEmail = {
				method: 'post',
				url: "http://localhost:5000/api/v1/users/validate",
				data: {field, payload}        
			}
			try {            
				const reply = await axios(optionsEmail)
				return reply.data
			} catch (err) { 
        console.log(err)        
        return "400 bad request"
			}
		
		

		default: return "method failed !"
	}
	
}