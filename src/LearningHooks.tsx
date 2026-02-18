import { useEffect, useState, useMemo, useCallback } from "react"

function sortMyArray(arr: number[]) {
    checkRender("Sort array")
    return arr.sort()
}

export const LearningHooks = () => {
    const [counter, setCounter] = useState(0)
    const [counter2, setCounter2] = useState(0)
    const [myArray] = useState([5, 4, 1, 2])

    // const sortedArray = sortMyArray(myArray)
    // console.log(sortedArray)

    const sortedArray = useMemo(() => {
    const hasilSort = sortMyArray(myArray)
    console.log("Sort : ", hasilSort) // Panggil hasilSort, bukan sortedArray
    return hasilSort
}, [myArray])

  
    checkRender("-")

    const reset = () => {
        checkRender("gapake useCallback")
        setCounter(0)
        setCounter2(0)
    }
    // useCallback : functionnya yg return, jadi ga di eksekusi

    const checking = (a: number) => {
        console.log('Checking called')
        return a >= 3
    }

    useEffect(() => {
        if (checking(counter) && checking(counter2)) {
            checkRender("Call reset")
            reset()
        }
    }, [counter, counter2])

    const updatedCounter = useMemo(() => {
        return counter * 4
    }, [counter])
    // useMemo : nilainya bakal diitung ulang kalo dependencynya berubah
    // lgsg dieksekusi

    useEffect(() => {
        checkRender("Update coutner 2 : " + counter2);
    }, [counter2])
    // useEffect inituh buat dependency list (?)
    // jadi kalo "counter" di click gaakan dijalanin, saolmya dependencynya counter2
    // akan dieksekusi ulang kalo dependencynya berubah (counter, counter2, dst)
    // dependency bisa banyak sih ga cuma 1

    return (
        <div>
            <h1>Learning Hooks</h1>
            <button onClick={() => setCounter(counter + 1)}>
                counter {counter}
            </button>
            <button onClick={() => setCounter2(counter2 + 1)}>
                counter2 {counter2}
            </button>
            <button onClick={reset}>
                Reset
            </button>
            <br />
            counter * 4 = {updatedCounter}
        </div>
    )
}

export default LearningHooks

function checkRender(label: string) {
    console.log("Rendering ", Math.random(), label)
}
