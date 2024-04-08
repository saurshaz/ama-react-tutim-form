import { TutimWizard, defaultFields } from "@tutim/fields";
import { FormProvider } from "@tutim/headless";
import { InputType, Field } from "@tutim/types";

const config = {
  "meta":{
    "title":"Setup User & Preferences",
    "description":"Basic"},
    "fields": [
      { key: 'company_name', label: 'Company name', type: 'text' ,"isRequired":true,"placeholder":"Enter your company name"},
      { key: 'db_uri', label: 'Database Connection URI', type: 'password',"isRequired":true, tooltip: 'Details for DB u will connect to',"placeholder":"postgresql+psycopg2://<UserName>:<DBPassword>@<Database Host>/<Database Name>" },
      {"key":"llm_type","type":"select","label":"LLM Type","isRequired":true, tooltip: 'Details for LLM u got',"defaultValue":"openai",
      "options":[{"label":"openai","value":"openai"},{"label":"gemini","value":"gemini"},{"label":"mistral","value":"mistral"}]},
      {"key":"llm_key","type":"password","label":"LLM KEY","isRequired":true, tooltip: 'Details for LLM key, if u got one'},
      {"key":"vanna_model","type":"text","label":"Vanna Model","isRequired":true, tooltip: 'Details for Vanna.ai model, if not create one at https://Vanna.ai'},
      {"key":"vanna_api_key","type":"password","label":"Vanna Model","isRequired":true, tooltip: 'Details for Vanna.ai API Key, if not get one at https://Vanna.ai'},
      { key: 'num_of_members', label: 'Number of team members', type: 'select', tooltip: 'Details for other team members', 
    options: [
      // {value:'-1', label:'Unknown'}, // uncomment and refresh the preview!
      {value:'1_5', label:'1 - 5'}, 
      {value:'5_25', label:'5 - 25'}, 
      {value:'above_25', label:'25 +'}] },
      { key: 'default_roles', label: 'Default Roles', type: InputType.MultiText, isDisabled: true, defaultValue: ['reader','salesreader','spendreader'], placeholder: 'reader' }, 
      { key: 'roles', label: 'Roles', type: 'array', children: {fields: [
        {key: 'role_name', label: 'New role name', type: 'text', placeholder: 'New role name' },
        { key: 'tables', label: 'Tables', type: 'array',  
        // defaultValue: [{'table_name': 'all','default_rls': '1=1','default_rls': '1=1'}]
        children: {
          fields: [
            {key: 'table_name', label: 'table',  type: InputType.MultiText, defaultValue: ['products']},
            {key: 'rls', label: 'additional where',  type: InputType.MultiText, defaultValue: ['1=1'] },
      ]}},
        
      ]}},
      { key: 'team_members', label: 'Team members', type: 'array', children: {fields: [
              {key: 'name', label: 'Full Name', type: 'text'},
              {"key":"email","type":"text","label":"Email","isRequired":true,"placeholder":"Enter your email",
      "validations":{"pattern":{"value":"^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$","message":"Must be a valid email"}}},
              {key: 'role', label: 'Role', type: InputType.MultiText, tooltip: 'Role', defaultValue: ['reader']  },
            ],},},
      {"key":"user_type","type":"select","label":"User Type","isRequired":true,"defaultValue":"user",
      "options":[{"label":"Admin","value":"admin"},{"label":"User","value":"user"}]},
      
      
      {"key":"widget_text_color","type":InputType.CustomColor,"label":"Text Color","isRequired":true, tooltip: 'Choose the color for text in widgets'},
      {"key":"widget_bg_color","type":InputType.CustomColor,"label":"Background Color Color","isRequired":true, tooltip: 'Choose the color for text in widgets'},
      {"key":"widget_text_size_1","type":'select',"label":"Heding text size","isRequired":true, tooltip: 'Choose the heading font for text in widgets', "defaultValue": "12",options: [
        {value:'10', label:'10'},{value:'12', label:'12'},{value:'14', label:'14'},{value:'16', label:'16'},{value:'18', label:'18'},{value:'20', label:'20'},]},
      {"key":"widget_text_size_2","type":'select',"label":"Body text size","isRequired":true, tooltip: 'Choose the body font for text in widgets', "defaultValue": "10",options: [
          {value:'10', label:'10'},{value:'12', label:'12'},{value:'14', label:'14'},{value:'16', label:'16'},{value:'18', label:'18'},{value:'20', label:'20'},]},
      {"key":"widget_text_snippet","type":"text-area","label":"Widget snippet to copy","isRequired":true, tooltip: 'Widget snippet to copy', defaultValue: ''},
      
      
      {"key":"terms_and_conditions","type":"checkbox","label":"I agree to the Terms and Conditions","isRequired":true}],
      
      
      
      "wizard":{"steps":[
        {"label":"Basic","fields":["company_name","llm_type","llm_key","vanna_model","vanna_api_key","db_uri","num_of_members"]},
        {"label":"Role Setup","fields":["default_roles","roles"]},
        {"label":"Team info","fields":["team_members"]},
        {"label":"Widget", "fields":["widget_text_color","widget_bg_color","widget_text_size_1","widget_text_size_2","widget_text_snippet"] },
         {"label":"Confirmation","fields":["terms_and_conditions"]}],
      "orientation":"horizontal"}}
      // {"key":"email","type":"text","label":"Email","isRequired":true,"placeholder":"Enter your email",
      // "validations":{"pattern":{"value":"^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$","message":"Must be a valid email"}}},
      //         {key: 'role', label: 'Role',  type: 'select', tooltip: 'Role', 
      //         options: [
      //           {value:'reader', label:'reader'}] },
      //       ]}

const CustomText: Field = ({ inputProps, fieldConfig }) => {
  const { value = '', onChange } = inputProps;
  // various hooks available: isDisabled, isRequired, options, defaultValue, validations
  const { key, label } = fieldConfig;
  return (
    <div key={key}>
      <input value={value} onChange={onChange} style={{ color: 'purple' }} />
    </div>
  );
};


const CustomColor: Field = ({ inputProps, fieldConfig }) => {
  const { value = '', onChange } = inputProps;
  // various hooks available: isDisabled, isRequired, options, defaultValue, validations
  const { key, label } = fieldConfig;
  return (
    <div key={key}>
      <label style={{  marginRight: '10px' }} className="MuiFormControl-root css-q8hpuo-MuiFormControl-root">{label}</label><br/>
      <input value={value} type="color" onChange={onChange} style={{ color: 'purple' }} />
    </div>
  );
};

const fieldComponents: FieldComponents = {
  ...defaultFields,
  [InputType.Color]: CustomColor
  // [InputType.Text]: CustomText, // uncomment this line to use custom components!
};


const App = () => {
  return (
    <FormProvider fieldComponents={fieldComponents}>
      <TutimWizard onSubmit={console.log} config={config} />
    </FormProvider>
  );
};

export default App;