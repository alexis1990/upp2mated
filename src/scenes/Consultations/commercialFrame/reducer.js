import initialState from './initialState'
import * as types from './actionTypes'
import update from 'react-addons-update'; // ES6

export function commercialFrameReducer(state = initialState, action = action) {
    switch (action.type) {
        case types.ADD_CATEGORY:
            return {
                ...state, values: {
                    ...state.values, categories: state.values.categories.concat(action.payload)
                } 
            };
        case types.ADD_SUB_CATEGORY:
            const { categoryId, subCategory } = action.payload;
            return update(state, {
                values :{
                    categories: {
                        [categoryId]: {
                            subCategory: {$push: [subCategory]}
                        }
                    }
                }
            })
        case types.ADD_DESIGNATION:
            const { parentsCategories, designation } = action.payload;
            return update(state, {
                values :{
                    categories: {
                        [parentsCategories.categoryId]: {
                            subCategory: {
                                [parentsCategories.subCategoryId]: {
                                    designations: {
                                        $push: [designation]
                                    }
                                }
                            }
                        }
                    }
                }
            })
        default:
            return state;
    }
}