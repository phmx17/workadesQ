import axios from 'axios'

export const desksApiCaller = async(method, data) => {
	switch(method) {
		case 'post':
			const optionsPost = {
				method: 'post',
				url: "http://localhost:5000/api/v1/desks",
				data        
			}
			try {            
				const reply = await axios(optionsPost)
				return reply.data
			} catch (err) { 
				return {success: false, error: err}
			}
		
		
		case 'get':
			const optionsGet = {
				url: "http://localhost:5000/api/v1/desks",
			}
			try {            
				const reply = await axios(optionsGet)
				return reply.data.data
			} catch (err) { 
				return {error: err.message}
			}

		default: return "method failed !"
	}
	
}