insert into w_user (
    first_name,
    last_name,
    username, 
    password,
    email,
    profile_pic
    )values(
    $1,
    $2,
    $3,
    $4,
    $5,
    $6  
)
returning username, email;