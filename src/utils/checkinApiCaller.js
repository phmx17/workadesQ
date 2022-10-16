import axios from 'axios'

export const checkinApiCaller = async(type, data) => {
	switch(type) {
		case 'checkin':
			const optionsCheckin = {
				method: 'post',
				url: "http://localhost:5000/api/v1/desks/checkin",
				data        
			}
			try {            
				const checkin = await axios(optionsCheckin)
        return {checkin}
			} catch (err) { 
        console.log("Checkin API error: ", err)
				return {err}
			}		
		
		case 'checkout':
			const optionsCheckout = {
        method: 'post',
				url: "http://localhost:5000/api/v1/desks/checkout",
        data
			}
			try {            
				await axios(optionsCheckout)
        return true
			} catch (err) { 
        console.log("Checkout API error: ", err)        
				return false
			}

		default: return "type not found!"
	}
	
}