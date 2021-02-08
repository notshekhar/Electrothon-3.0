let username = $(".username")
let password = $(".password")
let login_btn = $(".form > button")

let [token, setToken] = useCookie("token")

login_btn.on("click", async () => {
    console.log("okay")
    let arr = [username.value, password.value]
    let e = ["username", "password"]
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length == 0) {
            alert(`Please Enter ${e[i]}`)
            return
        }
    }
    // startLoading()
    let data = await APP.login({ username: arr[0], password: arr[1] })
    // hideloading()
    if (!data.error) {
        setToken(data.token)
        localStorage.setItem("user_data", data.data)
        window.location = "/home"
    }
})
