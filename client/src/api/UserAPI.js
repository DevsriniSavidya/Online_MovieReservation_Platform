import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [crrUser, setCrrUser] = useState([])

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    setCrrUser(res.data)
                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true): setIsAdmin(false)
                    console.log(res)

                    setCart(res.data.cart)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
            
        }
    },[token])

    const addCart = async (movie,newTime,selectedDate) => {
        if(!isLogged) return alert("please login")

        const check = cart.every(item =>{
            return item._id !== movie._id
        })

        if(check){
            setCart([...cart, {...movie, time:newTime, date:selectedDate, quantity: 1}])

            await axios.patch('/user/addcart', {cart: [...cart, {...movie, time:newTime, date:selectedDate, quantity: 1}]},{
                headers: {Authorization:token}
            })
            alert("This product successfully added to cart")

        }else{
            alert("This product has been added to cart")
        }
    }

    

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        crrUser: [crrUser, setCrrUser],

        // history: [history, setHistory]
    }
}

export default UserAPI