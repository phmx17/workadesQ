import axios from 'axios'

export const authApiCaller = async(method, data) => {
	switch(method) {
		case 'post':
			const optionsPost = {
				method: 'post',
				url: "http://localhost:5000/api/v1/auth/login",
				data,
				withCredentials: true,  // this enables cookie set in chrome; API will return Access-Control-Allow headers as middleware in server.js, otherwise no cookies!
			}
			try {            
				const reply = await axios(optionsPost)			
        return reply.data.data
			} catch (err) { 
        // login unsuccessful: axios falls into the catch block when setting response codes in the api
        // the api data returned is in err.response.data. errMsg was sent from api
        return {errMsg: err.response.data.errMsg} // errMsg was sent from api 
      }
		
		

		default: return "method failed !"
	}
	
}