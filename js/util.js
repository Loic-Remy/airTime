String.prototype.translate = function()
{
        let word = this.toLowerCase();
        let reason = dictionary;
        let english= 0;
        let french =1;
        let translation = null;
       
        for (let i = 0; i < reason.length; i++)
        {
            if(reason[i][english] === word)
            {
                translation = reason[i][french];
                break;
            }
            else if (reason[i][french] === word)
            {
                translation = reason[i][english];
                break;
            }
        }

        if (translation === null)
        {
            throw new Error("valeur inconnue");
        }
        else
        {
            return translation;
        }
};




