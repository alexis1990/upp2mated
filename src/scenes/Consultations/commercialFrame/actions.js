import * as types from './actionTypes'

export function addCategory(category) {
    return {
        type: types.ADD_CATEGORY,
        payload: { ...category, subCategory: [] }
    }
}

export function addSubCategory(selectedSubCategory) {
    const subCategory = {...selectedSubCategory, designations: []}
    console.log()
    return {
        type: types.ADD_SUB_CATEGORY,
        payload: {
            subCategory: subCategory,
            categoryId: subCategory.categoryId
        }
    }
}

export function addDesignation(designation, parentsCategories) {
    return {
        type: types.ADD_DESIGNATION,
        payload: {
            designation: designation,
            parentsCategories: parentsCategories
        }
    }
}