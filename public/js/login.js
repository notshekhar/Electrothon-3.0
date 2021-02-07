let username = $(".username")
let password = $(".password")

username.on("change", () => {
    console.log(username.value, password.value)
})
