const fs =require('fs')
const {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
} = require("../lib/animals.js")
const { animals } = require("../data/animals")

jest.mock('fs')

test("creates an animal object", () => {
    const animal = createNewAnimal(
        { name: "Zuzu", id: "805"}, animals
    )
        expect(animal.name).toBe("Zuzu")
        expect(animal.id).toBe("805")
    })
test("filters by query", () => {
    const startingAnimals = [
        {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
        personalityTraits: ["quirky", "rash"],
        },
        {
        id: "4",
        name: "Noel",
        species: "bear",
        diet: "carnivore",
        personalityTraits: ["impish", "sassy", "brave"],
        },
    ]
    const updatedAnimals = filterByQuery({species: "bear"}, startingAnimals)
    expect(updatedAnimals.length).toEqual(1)
})

    test("finds by id", () => {
        const startingAnimals = [
            {
                id: "3",
                name: "Erica",
                species: "gorilla",
                diet: "omnivore",
                personalityTraits: ["quirky", "rash"],
              },
              {
                id: "4",
                name: "Noel",
                species: "bear",
                diet: "carnivore",
                personalityTraits: ["impish", "sassy", "brave"],
              },
        ]
        const result = findById("3", startingAnimals)
        expect(result.name).toBe("Erica")
    })

    test("validate personality traits", () => {
        const animal = {
                id: "3",
                name: "Ava",
                species: "banana snake",
                diet: "carinvore",
                personalityTraits: ["fun", "fabulous"],
              }
        const invalidAnimal = {
                id: "4",
                name: "Demonia",
                species: "squirrel",
                diet: "herbivore",
            }

        const validResult = validateAnimal(animal)
        const invalidResult = validateAnimal(invalidAnimal)

        expect(validResult).toBe(true)
        expect(invalidResult).toBe(false)

    })