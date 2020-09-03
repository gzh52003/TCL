(async ()=>{
    const userInfo = document.querySelector('#userInfo');
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser)
    if(!currentUser){
        location.href="../login.html"
    }else{
        const result = await fetch(`http://localhost:5000/jwtverify?authorization=${currentUser.authorization}`).then(res => res.json());
        if (result.type == "error8") {
                    localStorage.removeItem('currentUser');
                    location.href = './login.html'
                }else{
                    userInfo.innerHTML=currentUser.username
                }
    }


    const btnLogout = document.querySelector('#btnLogout');
    btnLogout.onclick=function(){
                    localStorage.removeItem('currentUser');
                    location.href = '../login.html'
    }
})()