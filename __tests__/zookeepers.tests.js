const fs = require('fs')
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require("../lib/zookeepers.js")
const { zookeepers } = require("../data/zookeepers")

jest.mock('fs')

test("creates new zookeeper", () => {
    const zookeeper = createNewZookeeper(
        {name: "Rico", age: 32}, zookeepers
    )
    expect(zookeeper.name).toBe("Rico")
    expect(zookeeper.age).toEqual(32)
})
test("filters zookeepers by Id", () => {
    const startingZookeepers = [
        {
            id: "2",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin",
          },
          {
            id: "3",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear",
          },
    ]

    const result = findById("2", startingZookeepers)

    expect(result.name).toBe("Raksha")
})

test("filters zookeepers by query", () => {
    const startingZookeepers = [
        {
          id: "2",
          name: "Raksha",
          age: 31,
          favoriteAnimal: "penguin",
        },
        {
          id: "3",
          name: "Isabella",
          age: 67,
          favoriteAnimal: "bear",
        },
      ]
      const updatedZookeepers = filterByQuery({favoriteAnimal: "bear"}, startingZookeepers)
      expect(updatedZookeepers.length).toEqual(1)

})

test("see if zookeeper is a valid obj", () => {
    const zookeeper1 = {
          id: "2",
          name: "Raksha",
          age: 31,
          favoriteAnimal: "penguin",
        }
    const zookeeper2 =
        {
          id: "3",
          name: "Isabella",
          age: "blue",
          favoriteAnimal: "bear",
        }

    const validResult = validateZookeeper(zookeeper1)
    const invalidResult = validateZookeeper(zookeeper2)

    expect(validResult).toBe(true)
    expect(invalidResult).toBe(false)
})