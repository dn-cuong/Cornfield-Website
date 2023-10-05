$('#submit').click((e) => {
    e.preventDefault();
    let username = $('#user').val();
    let password = $('#pass').val();
    $.ajax({
        type: "POST",
        url: "/api/user/login",
        data: {"username": username, "password": password},
        success: () => {
            window.location.href = '/'
        }
    })
})

$('#submit-reg').click((e) => {
    e.preventDefault();
    let username = $('#user1').val();
    let password = $('#pass1').val();
    $.ajax({
        type: "POST",
        url: "/api/user/signup",
        data: {"username": username, "password": password, "principalId": principalId},
        success: () => {
            window.location.href = '/'
        }
    })
})