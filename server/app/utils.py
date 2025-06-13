from bson import ObjectId


def fix_object_ids(doc):
    doc = dict(doc)  # convert Motor Cursor document to dict if needed
    for key in ["_id", "status_id", "user_id"]:
        if key in doc and isinstance(doc[key], ObjectId):
            doc[key] = str(doc[key])
    # If you also include joined status name, keep it as is or convert if needed
    return doc
