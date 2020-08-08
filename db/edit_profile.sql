update w_user
set first_name = $1,
last_name = $2,
username = $3,
profile_pic = $4
where id = ${id}