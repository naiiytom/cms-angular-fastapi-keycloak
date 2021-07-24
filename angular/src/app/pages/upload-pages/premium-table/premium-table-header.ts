
export function getPremiumTableHeader(name: string) {
  return settings[name];
}

const settings = {
  // age,multiplier_male,multiplier_female,text_male,text_female
  'CI_perfect_care': {
    columns: {
      age: {
        title: 'Age',
        type: 'number',
      },
      multiplier_male: {
        title: 'Multiplier M',
        type: 'number',
      },
      multiplier_female: {
        title: 'Multiplier F',
        type: 'string',
      },
      text_male: {
        title: 'Text M',
        type: 'string',
      },
      text_female: {
        title: 'Text F',
        type: 'string',
      },
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
    },
  },
  // age,text_male,text_female,type1_plan1_stage1_male,type1_plan1_stage1_female,type1_plan2_stage1_male,type1_plan2_stage1_female,type1_plan3_stage1_male,type1_plan3_stage1_female,type1_plan4_stage1_male,type1_plan4_stage1_female,type1_plan5_stage1_male,type1_plan5_stage1_female,type2_plan6_stage1_male,type2_plan6_stage1_female,type1_plan1_stage2_male,type1_plan1_stage2_female,type1_plan2_stage2_male,type1_plan2_stage2_female,type1_plan3_stage2_male,type1_plan3_stage2_female,type1_plan4_stage2_male,type1_plan4_stage2_female,type1_plan5_stage2_male,type1_plan5_stage2_female,type2_plan6_stage2_male,type2_plan6_stage2_female
  'D-care': {
    columns: {
      age: {
        title: 'Age',
        type: 'number',
      },
      text_male: {
        title: 'Text M',
        type: 'string',
      },
      text_female: {
        title: 'Text F',
        type: 'string',
      },
      type1_plan1_stage1_male: {
        title: 'T1 P1 S1 M',
        type: 'number',
      },
      type1_plan1_stage1_female: {
        title: 'T1 P1 S1 F',
        type: 'string',
      },
      type1_plan2_stage1_male: {
        title: 'T1 P2 S1 M',
        type: 'string',
      },
      type1_plan2_stage1_female: {
        title: 'T1 P2 S1 F',
        type: 'string',
      },
      type1_plan3_stage1_male: {
        title: 'T1 P3 S1 M',
        type: 'string',
      },
      type1_plan3_stage1_female: {
        title: 'T1 P3 S1 F',
        type: 'string',
      },
      type1_plan4_stage1_male: {
        title: 'T1 P4 S1 M',
        type: 'string',
      },
      type1_plan4_stage1_female: {
        title: 'T1 P4 S1 F',
        type: 'string',
      },
      type1_plan5_stage1_male: {
        title: 'T1 P5 S1 M',
        type: 'string',
      },
      type1_plan5_stage1_female: {
        title: 'T1 P5 S1 F',
        type: 'string',
      },
      type2_plan6_stage1_male: {
        title: 'T2 P6 S1 M',
        type: 'string',
      },
      type2_plan6_stage1_female: {
        title: 'T2 P6 S1 F',
        type: 'string',
      },
      type1_plan1_stage2_male: {
        title: 'T1 P1 S2 M',
        type: 'string',
      },
      type1_plan1_stage2_female: {
        title: 'T1 P1 S2 F',
        type: 'string',
      },
      type1_plan2_stage2_male: {
        title: 'T1 P2 S2 M',
        type: 'string',
      },
      type1_plan2_stage2_female: {
        title: 'T1 P2 S2 F',
        type: 'string',
      },
      type1_plan3_stage2_male: {
        title: 'T1 P3 S2 M',
        type: 'string',
      },
      type1_plan3_stage2_female: {
        title: 'T1 P3 S2 F',
        type: 'string',
      },
      type1_plan4_stage2_male: {
        title: 'T1 P4 S2 M',
        type: 'string',
      },
      type1_plan4_stage2_female: {
        title: 'T1 P4 S2 F',
        type: 'string',
      },
      type1_plan5_stage2_male: {
        title: 'T1 P5 S2 M',
        type: 'string',
      },
      type1_plan5_stage2_female: {
        title: 'T1 P5 S2 F',
        type: 'string',
      },
      type2_plan6_stage2_male: {
        title: 'T2 P6 S2 M',
        type: 'string',
      },
      type2_plan6_stage2_female: {
        title: 'T2 P6 S2 F',
        type: 'string',
      },
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
    },
  },
  // age,plan1_male,plan1_female,plan2_male,plan2_female
  'D-health': {
    columns: {
      age: {
        title: 'Age',
        type: 'string',
      },
      plan1_male: {
        title: 'Plan 1 M',
        type: 'string',
      },
      plan1_female: {
        title: 'Plan 1 F',
        type: 'string',
      },
      plan2_male: {
        title: 'Plan 2 M',
        type: 'string',
      },
      plan2_female: {
        title: 'Plan 2 F',
        type: 'string',
      },
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
    },
  },
  // age,row,plan1_male,plan1_female,plan2_male,plan2_female,plan3_male,plan3_female,plan4_male,plan4_female
  'D-kids': {
    columns: {
      age: {
        title: 'Age',
        type: 'string',
      },
//       row: {
//         title: 'Row',
//         type: 'string',
//       },
      plan1_male: {
        title: 'Plan 1 M',
        type: 'string',
      },
      plan1_female: {
        title: 'Plan 1 F',
        type: 'string',
      },
      plan2_male: {
        title: 'Plan 2 M',
        type: 'string',
      },
      plan2_female: {
        title: 'Plan 2 F',
        type: 'string',
      },
      plan3_male: {
        title: 'Plan 3 M',
        type: 'string',
      },
      plan3_female: {
        title: 'Plan 3 F',
        type: 'string',
      },
      plan4_male: {
        title: 'Plan 4 M',
        type: 'string',
      },
      plan4_female: {
        title: 'Plan 4 F',
        type: 'string',
      },
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
    },
  },
  // age,plan1,plan2,plan3
  'Elite_health': {
    columns: {
      age: {
        title: 'Age',
        type: 'number',
      },
      plan1: {
        title: 'Plan 1',
        type: 'string',
      },
      plan2: {
        title: 'Plan 2',
        type: 'string',
      },
      plan3: {
        title: 'Plan 3',
        type: 'string',
      },
      plan4: {
        title: 'Plan 4',
        type: 'string',
      },
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
    },
  },
  // age,row,plan1_male,plan1_female,plan2_male,plan2_female,plan3_male,plan3_female
  'ExtraCare': {
    columns: {
      age: {
        title: 'Age',
        type: 'string',
      },
//       row: {
//         title: 'Row',
//         type: 'string',
//       },
      plan1_male: {
        title: 'Plan 1 M',
        type: 'string',
      },
      plan1_female: {
        title: 'Plan 1 F',
        type: 'string',
      },
      plan2_male: {
        title: 'Plan 2 M',
        type: 'string',
      },
      plan2_female: {
        title: 'Plan 2 F',
        type: 'string',
      },
      plan3_male: {
        title: 'Plan 3 M',
        type: 'string',
      },
      plan3_female: {
        title: 'Plan 3 F',
        type: 'string',
      },
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
    },
  },
  // age,row,plan1_male,plan1_female,plan2_male,plan2_female,plan3_male,plan3_female
  'ExtraCarePlus': {
    columns: {
      age: {
        title: 'Age',
        type: 'string',
      },
//       row: {
//         title: 'Row',
//         type: 'string',
//       },
      plan1_male: {
        title: 'Plan 1 M',
        type: 'string',
      },
      plan1_female: {
        title: 'Plan 1 F',
        type: 'string',
      },
      plan2_male: {
        title: 'Plan 2 M',
        type: 'string',
      },
      plan2_female: {
        title: 'Plan 2 F',
        type: 'string',
      },
      plan3_male: {
        title: 'Plan 3 M',
        type: 'string',
      },
      plan3_female: {
        title: 'Plan 3 F',
        type: 'string',
      },
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
    },
  },
  // age,multiplier_male,multiplier_female,text_male,text_female
  'multiple_CI': {
    columns: {
      age: {
        title: 'Age',
        type: 'number',
      },
      multiplier_male: {
        title: 'Multiplier M',
        type: 'number',
      },
      multiplier_female: {
        title: 'Multiplier F',
        type: 'string',
      },
      text_male: {
        title: 'Text M',
        type: 'string',
      },
      text_female: {
        title: 'Text F',
        type: 'string',
      },
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
    },
  },
  // age,row,plan1_male,plan1_female,plan2_male,plan2_female,plan3_male,plan3_female,plan4_male,plan4_female,plan5_male,plan5_female,plan6_male,plan6_female,plan7_male,plan7_female
  'OPD_rider': {
    columns: {
      age: {
        title: 'Age',
        type: 'string',
      },
//       row: {
//         title: 'Row',
//         type: 'string',
//       },
      plan1_male: {
        title: 'Plan 1 M',
        type: 'string',
      },
      plan1_female: {
        title: 'Plan 1 F',
        type: 'string',
      },
      plan2_male: {
        title: 'Plan 2 M',
        type: 'string',
      },
      plan2_female: {
        title: 'Plan 2 F',
        type: 'string',
      },
      plan3_male: {
        title: 'Plan 3 M',
        type: 'string',
      },
      plan3_female: {
        title: 'Plan 3 F',
        type: 'string',
      },
      plan4_male: {
        title: 'Plan 4 M',
        type: 'string',
      },
      plan4_female: {
        title: 'Plan 4 F',
        type: 'string',
      },
      plan5_male: {
        title: 'Plan 5 M',
        type: 'string',
      },
      plan5_female: {
        title: 'Plan 5 F',
        type: 'string',
      },
      plan6_male: {
        title: 'Plan 6 M',
        type: 'string',
      },
      plan6_female: {
        title: 'Plan 6 F',
        type: 'string',
      },
      plan7_male: {
        title: 'Plan 7 M',
        type: 'string',
      },
      plan7_female: {
        title: 'Plan 7 F',
        type: 'string',
      },
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
    },
  },
};
