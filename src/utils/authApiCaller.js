import axios from 'axios'

export const authApiCaller = async(method, data) => {
	switch(method) {
		case 'post':
			const optionsPost = {
				method: 'post',
				url: "http://localhost:5000/api/v1/auth",
				data        
			}
			try {            
				const reply = await axios(optionsPost)
				return reply.data
			} catch (err) { 
				return {success: false, error: err}
			}
		
		

		default: return "method failed !"
	}
	
}