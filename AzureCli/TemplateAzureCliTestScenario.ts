﻿import { CodeModelCli, CommandExample } from "./CodeModelCli"
import { ModuleMethod } from "../ModuleMap";

export function GenerateAzureCliTestScenario(model: CodeModelCli) : string[] {
    var output: string[] = [];

    output.push("# --------------------------------------------------------------------------------------------");
    output.push("# Copyright (c) Microsoft Corporation. All rights reserved.");
    output.push("# Licensed under the MIT License. See License.txt in the project root for license information.");
    output.push("# --------------------------------------------------------------------------------------------");
    output.push("");
    output.push("import os");
    output.push("import unittest");
    output.push("");
    output.push("from azure_devtools.scenario_tests import AllowLargeResponse");
    output.push("from azure.cli.testsdk import (ScenarioTest, ResourceGroupPreparer)");
    output.push("");
    output.push("");
    output.push("TEST_DIR = os.path.abspath(os.path.join(os.path.abspath(__file__), '..'))");
    output.push("");
    output.push("");
    output.push("class ApimgmtScenarioTest(ScenarioTest):");
    output.push("");
    output.push("    @ResourceGroupPreparer(name_prefix='cli_test_apimgmt')");
    output.push("    def test_apimgmt(self, resource_group):");
    output.push("");
    output.push("        self.kwargs.update({");
    output.push("            'name': 'test1'");
    output.push("        })");
    output.push("");
    output.push("        self.cmd('apimgmt create -g {rg} -n {name} --tags foo=doo', checks=[");
    output.push("            self.check('tags.foo', 'doo'),");
    output.push("            self.check('name', '{name}')");
    output.push("        ])");
    output.push("        self.cmd('apimgmt update -g {rg} -n {name} --tags foo=boo', checks=[");
    output.push("            self.check('tags.foo', 'boo')");
    output.push("        ])");
    output.push("        count = len(self.cmd('apimgmt list').get_output_in_json())");
    output.push("        self.cmd('apimgmt show - {rg} -n {name}', checks=[");
    output.push("            self.check('name', '{name}'),");
    output.push("            self.check('resourceGroup', '{rg}'),");
    output.push("            self.check('tags.foo', 'boo')");
    output.push("        ])");
    output.push("        self.cmd('apimgmt delete -g {rg} -n {name}')");
    output.push("        final_count = len(self.cmd('apimgmt list').get_output_in_json())");
    output.push("        self.assertTrue(final_count, count - 1)");
    output.push("");

    return output;
}