﻿/**
 * Reference docs for how to build a CKEditor plugin:
 * http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_1
 */


CKEDITOR.plugins.add('bootstrapTabs', {
	requires: 'dialog',
	icons: 'bootstrapTabs',
	init: function( editor ) {
		// Plugin logic goes here...

		// Create the command for the plugin.
		editor.addCommand('bootstrapTabs', new CKEDITOR.dialogCommand('bootstrapTabsDialog'));

		// Add the button for the plugin.
		editor.ui.addButton('BootstrapTabs', {
			label: 'Insert Tabs',
			command: 'bootstrapTabs', // The command that was created by addCommand, above.
			toolbar: 'insert' // Defines the toolbar group. Can also specify an index for ordering: 'insert,30' or 'insert,100', or 'insert,0'.
		});

	  CKEDITOR.dialog.add('bootstrapTabsDialog', this.path + 'dialogs/bootstrapTabs.js');

		// Context menu support in CKEditor is implemented by the Context Menu plugin.
    // The context menu implementation should be placed inside the init function in the plugin file,
    // following the command and button definitions.
	  // The if check here is a "best practice".
	  // If for some reason the Context Menu plugin will be removed or not available,
	  // the menu registration should not take place (otherwise an exception is thrown).
	  // http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_2

		if ( editor.contextMenu ) {
	    editor.addMenuGroup( 'bootstrapTabsGroup' );
	    editor.addMenuItem( 'bootstrapTabsItem', {
        label: 'Edit Tabs',
        icon: this.path + 'icons/bootstrapTabs.png',
        command: 'bootstrapTabs',
        group: 'bootstrapTabsGroup'
	    });

	    editor.contextMenu.addListener( function(element) {
		    // If an ascendant of the element has the nav-tabs or tab-content class,
		    // enable the context menu (a button with off state for the tab)
		    ascendant = element.getAscendant( function(element) {
	    		return element.hasClass('nav-tabs') || element.hasClass('tab-content');
				});
        if ( ascendant ) {
          return { bootstrapTabsItem: CKEDITOR.TRISTATE_OFF };
        }
	    });

		}

		// Register a doubleclick event handler
		// When an element is double-clicked, the bootstrapTabsDialog
		// will be displayed for elements that are descendents part of a tab set.
		editor.on('doubleclick', function (event) {
      var element = event.data.element;

	    // If an ascendant of the element has the nav-tabs or tab-content class,
	    // enable the context menu (a button with off state for the tab)
	    ascendant = element.getAscendant( function(element) {
	    	// QUESTION: How to prevent linkDialog from displaying on doubleclick in a nav-tab?
	    	// In the case of of a[role="tab"], the link dialog is not displayed, but the bootstrapTabsDialog
	    	// is not displayed as preferred.
    		return ( element.name == 'a' && element.attributes.role == 'tab') ||
    				   element.hasClass('nav-tabs') || element.hasClass('tab-content');
			});

			if ( ascendant ) {
        event.data.dialog = 'bootstrapTabsDialog';
      }

    });
	}
});