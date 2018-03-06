import initialState from './initialState'
import * as types from './actionTypes'
import update from 'immutability-helper';

export function commercialFrameReducer(state = initialState, action = action) {
    switch (action.type) {
        case types.ADD_CATEGORY:
            return {
                ...state, values: {
                    ...state.values, categories: state.values.categories.concat(action.payload)
                }
            };
        case types.REMOVE_CATEGORY:
            return {
                ...state, values: {
                    ...state.values, 
                    categories: state.values.categories.filter((category) => category.id !== action.payload.id)
                }
            };
        case types.ADD_SUB_CATEGORY:
            return update(state, {
                values: {
                    categories: {
                        [action.payload.categoryId]: {
                            subCategory: { $push: [ action.payload.subCategory] }
                        }
                    }
                }
            })
        case types.REMOVE_SUB_CATEGORY:
            return update(state, {
                values: {
                    categories: {
                        [action.payload.categoryId]: {
                            subCategory: { 
                                $apply: subCategory => subCategory.filter(s => s.id !== action.payload.subCategoryId)
                            }
                        }
                    }
                }
            })
        case types.ADD_DESIGNATION:
            return update(state, {
                values: {
                    categories: {
                        [action.payload.parentsCategories.categoryId]: {
                            subCategory: {
                                [action.payload.parentsCategories.subCategoryId]: {
                                    designations: {
                                        $push: [action.payload.designation]
                                    }
                                }
                            }
                        }
                    }
                }
            })
        case types.REMOVE_DESIGNATION:
        console.log('action.payload', action.payload)
            return update(state, {
                values: {
                    categories: {
                        [action.payload.parentsCategories.categoryId]: {
                            subCategory: {
                                [action.payload.parentsCategories.subCategoryId]: {
                                    designations: {
                                        $apply: designations => designations.filter(d => d.id !== action.payload.designation.id)
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