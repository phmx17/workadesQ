import axios from 'axios'

export const desksApiCaller = async(method, data) => {
	switch(method) {
		case 'post':
			const options = {
				method: 'post',
				url: "http://localhost:5000/api/v1/desks",
				data        
			}
			try {            
				const reply = await axios(options)
				return reply.data
			} catch (err) { 
				return {success: false, error: err}
			}
		
		
		case 'get':
		
		default: return "method failed !"
	}
	
}