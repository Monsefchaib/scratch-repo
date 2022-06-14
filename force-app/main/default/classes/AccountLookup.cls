public class AccountLookup {
    
@AuraEnabled(cacheable=true)
    public static List<sObject> searchAuditableAccounts(string searchTerm,string myObject, Boolean auditable) {
        String myQuery = null;
        if(auditable){
            myQuery = 'Select Id, Name from '+myObject+' Where Name Like  \'%' + searchTerm + '%\' AND  Auditable__c = true Limit 5 ';
        }
        else {
            myQuery = 'Select Id, Name from '+myObject+' Where Name Like  \'%' + searchTerm + '%\' AND Auditable__c = false Limit 5';

        }
        List<sObject> lookUpList = database.query(myQuery);
        System.debug(lookUpList);
        return lookUpList;
    }
}