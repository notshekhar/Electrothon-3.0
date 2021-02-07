const APP = {
    login: async function ({ username, password }) {
        if (!(username & password)) {
            APP.renderError("Username or the Password is missing try again")
            return
        }
        let res = await fetch("/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                u_username: username,
                u_password: password,
            }),
        })
        let data = await res.json()
        return data
    },
    signup: async function ({ username, password, name }) {
        if (
            !((usernmae.length > 0) & (password.length > 0) & (name.length > 0))
        ) {
            APP.renderError("You can't leave any Field Empty")
            return
        }
        let res = await fetch("/signup", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                u_username: username,
                u_password: password,
                u_name: name,
            }),
        })
        let data = await res.json()
        return data
    },
    auth: async function (token) {
        let res = await fetch(`/auth?token=${token}`)
        let data = await res.json()
        return data
    },
    renderError: async function (message) {
        let div = document.createElement("div")
        div.classList.add("error")
        let styles = {
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "10px",
            color: "white",
            backgroundColor: "rgba(255, 0, 0, 0.7)",
            borderRadius: "14px",
            zIndex: "10",
            minWidth: "100px",
            display: "flex",
            justifyContent: "center",
        }
        for (let style in styles) {
            div.style[style] = styles[style]
        }
        div.innerHTML = message
        document.body.append(div)
        setTimeout(() => {
            div.remove()
        }, 2000)
    },
}
