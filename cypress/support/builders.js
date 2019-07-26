export class DocumentTypeBuilder {
    compositeContentTypes = [];
    isContainer = false;
    allowAsRoot = false;
    allowedTemplates = [];
    allowedContentTypes = [];
    alias = null;
    description = null;
    thumbnail = "folder.png";
    name = null;
    id = 0;
    icon = "icon-document";
    trashed =false;
    key = _generateGuid();
    parentId = -1;
    path = null;
    allowCultureVariant = false;
    isElement = false;
    defaultTemplate = null;
    groups = [];
    
    constructor(name) {
        this.name = name;
        this.alias = _camelize(name);
        this.defaultTemplate = this.alias;
        this.allowedTemplates.push(this.defaultTemplate);
    }
    
    build() {
        return {
            compositeContentTypes : this.compositeContentTypes,
            isContainer : this.isContainer,
            allowAsRoot : this.allowAsRoot,
            allowedTemplates : this.allowedTemplates,
            allowedContentTypes : this.allowedContentTypes,
            alias : this.alias,
            description : this.description,
            thumbnail : this.thumbnail,
            name : this.name,
            id : this.id,
            icon : this.icon,
            trashed : this.trashed,
            key : this.key,
            parentId : this.parentId,
            path : this.path,
            allowCultureVariant : this.allowCultureVariant,
            isElement : this.isElement,
            defaultTemplate : this.defaultTemplate,
            groups : this.groups,
        }
    }
    
    addPropertyGroup(propertyGroup){
        this.groups.push(propertyGroup);

        return this;
    }
    
}


export class DocumentTypeGroupBuilder {
    name = null;
    sortOrder = 0;
    properties = [];
    
    constructor(name) {
        this.name = name;
    }

    addProperty(property){
        this.properties.push(property);

        return this;
    }
    
    build() {
        return {
            name: this.name,
            sortOrder: this.sortOrder,
            properties: this.properties
        }
    }
}

export class PropertyBuilder {
    alias = null;
    allowCultureVariant = false;
    dataTypeId = 0;
    label = "";
    sortOrder = 0;
    validation = {mandatory: false, pattern: null};
    
    constructor(label, dataTypeId) {
        this.label = label;
        this.alias = _camelize(this.label);
        this.dataTypeId = dataTypeId;
    }
        
    build() {
        return {
            alias: this.alias,
            allowCultureVariant: this.allowCultureVariant,
            dataTypeId: this.dataTypeId,
            label: this.label,
            sortOrder: this.sortOrder,
            validation: this.validation,
        }
    }
}

function _camelize(str) {
    if(str.length === 0){
        return str;
    }
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

function _generateGuid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};