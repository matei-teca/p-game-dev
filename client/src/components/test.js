import {atom} from 'jotai'

const state = {
    level: atom({
        level: 1,
        exp: 0,
        maxExp: 300
    })
}

export default state