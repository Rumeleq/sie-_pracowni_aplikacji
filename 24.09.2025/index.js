const readline = require('readline')

let user_name = ''
let user_age = 0
let numbers_list = []

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

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Podaj swoje imię: ', name =>
{
    user_name = name

    rl.question('Podaj swój wiek: ', ageStr =>
    {
        user_age = Number(ageStr)

        rl.question('Podaj liczby, oddzielone spacją: ', numsLine =>
        {
            let parts = numsLine.split(' ')
            numbers_list = parts.map(p => Number(p))

            console.log(`Cześć, ${user_name}!`)
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

            rl.close()
        })
    })
})
