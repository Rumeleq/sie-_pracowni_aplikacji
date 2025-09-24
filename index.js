let user_name = "Michał"
let user_age = 20
let numbers_list = [1, 2, 3, 4, 5]

function check_adulthood(age)
{
    if (age >= 18) 
    {
        return "Jesteś pełnoletni."
    } 
    else 
    {
        return "Nie jesteś pełnoletni."
    }
}

function sum_array(arr)
{
    let sum = 0
    for (let i = 0; i < arr.length; i++) 
    {
        sum += arr[i]
    }
    return sum
}

console.log(`Cześć ${user_name}!`)
console.log(check_adulthood(user_age))

let total = sum_array(numbers_list)
console.log(`Suma elementów tablicy to: ${total}`)

if (total > 10) 
{
    console.log("Suma jest większa niż 10, oto elementy:")
    for (let number of numbers_list) 
    {
        console.log(number)
    }
} 
else 
{
    console.log("Suma nie jest większa niż 10.")
}
