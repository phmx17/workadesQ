import axios from 'axios'

export const usersApiCaller = async(method, data) => {
	switch(method) {
		case 'post':
			const optionsPost = {
				method: 'post',
				url: "http://localhost:5000/api/v1/users",
				data        
			}
			try {            
				const reply = await axios(optionsPost)
				return 
			} catch (err) { 
				const errKeyValue = err.response.data.data.keyValue
				if (errKeyValue.username) return "username has already been taken"			

				if (errKeyValue.email) return "email is already in use"

				// if (err.code === 11000) console.log("duplicate key", err.keyValue)
				return {success: false, error: err}
			}
		
		

		default: return "method failed !"
	}
	
}