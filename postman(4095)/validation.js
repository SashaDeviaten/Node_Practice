const E_REQ = 'Required';

function validateRequest(request) {
    const errors = {};
    let valid = true;

    for (let field in request) {
        if (Array.isArray(request[field])) {
            errors[field] = request[field].map(item => {
                const listItemError = {};
                for (let listField in item) {
                    if (!item[listField]) {
                        if (valid)
                            valid = false;
                        listItemError[listField] = E_REQ
                    }
                }

                return listItemError
            });
        }
        else {
            if (request[field]) {
                switch (field) {
                    case 'URL': {
                        if (!(/https?:\/\//).test(request[field])) {
                            errors[field] = 'only absolute urls are supported';
                            if (valid)
                                valid = false;

                        }
                        break;
                    }
                }
            }
            else {
                if (valid)
                    valid = false;
                errors[field] = E_REQ
            }
        }
    }

    return {errors, valid}

}

module.exports={
    validateRequest
};
