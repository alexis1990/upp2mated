import * as types from './actionTypes'

export function addCategory(category) {
    return {
        type: types.ADD_CATEGORY,
        payload: { ...category, subCategory: [] }
    }
}

export function removeCategory(category) {
    return {
        type: types.REMOVE_CATEGORY,
        payload: category
    }
}

export function addSubCategory(selectedSubCategory, categoryPositionIndex) {
    
    const subCategory = {...selectedSubCategory, designations: []}
    return {
        type: types.ADD_SUB_CATEGORY,
        payload: {
            subCategory: subCategory,
            categoryPositionIndex: categoryPositionIndex
        }
    }
}

export function removeSubCategory(subCategoryId, categoryPositionIndex) {
    return {
        type: types.REMOVE_SUB_CATEGORY,
        payload: {
            subCategoryId: subCategoryId,
            categoryPositionIndex: categoryPositionIndex
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

export function removeDesignation(designation, parentsCategories) {
    return {
        type: types.REMOVE_DESIGNATION,
        payload: {
            designation: designation,
            parentsCategories: parentsCategories
        }
    }
}