import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLogo from '@/_components/AppLogo';
import { Modes } from '../reducer/reducer';
import EditAppName from '../../Editor/Header/EditAppName';
import { Toggle } from '../../Editor/CodeBuilder/Elements/Toggle';
import { appService } from '@/_services';
import { ToolTip } from '@/_components/ToolTip';
import Beta from '../../_ui/Beta';

const Header = (props) => {
  const { executeWorkflow, editorSession, editorSessionActions, saveAppName } = props;
  const value = editorSession.maintenance;

  const onEnableChange = () => {
    appService.setMaintenance(editorSession.app.id, !value);
    editorSessionActions.setMaintenanceStatus(!value);
  };

  const isRunnable = editorSession.queries && editorSession.queries.length > 0;

  return (
    <div className="header">
      <div className="grid">
        <div className="row" style={{ height: '40px' }}>
          <div className="items">
            <div className="logo-section">
              <Link to="/">
                <AppLogo isLoadingFromHeader={true} />
              </Link>
            </div>
            <div className="name-editor" style={{ display: 'flex', flexDirection: 'row' }}>
              <EditAppName
                appId={editorSession.app.id}
                appName={editorSession.app.name}
                onNameChanged={(name) => {
                  saveAppName(name);
                }}
              />
              <Beta style={{ width: '42px', height: '20px', margin: 'auto', fontWeight: 400 }} />
            </div>
            <div className="saving-status">
              {editorSession.appSavingStatus.status ? 'Saving..' : 'All changes saved'}
            </div>
            <div className="run-button">
              <div className="button-container">
                <ToolTip message="Enable/Disable workflow in app." placement="bottom">
                  <Toggle value={value} onChange={onEnableChange} />
                </ToolTip>
                <button
                  onClick={executeWorkflow}
                  type="button"
                  className="btn btn-primary run-button"
                  style={{ height: '30px', marginRight: 6 }}
                  disabled={editorSession.mode === Modes.Running || !isRunnable}
                >
                  {editorSession.mode === Modes.Running ? 'Running' : 'Run'}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-3">
            <AppVersionsManager
              appId={editorSession.app.id}
              editingVersion={{ id: editorSession.app.versionId }}
              releasedVersionId={editorSession.app.releasedVersionId}
              setAppDefinitionFromVersion={(version) => {
                editorSessionActions.setAppVersionId(version.id);
                // editorSessionActions.setQueries(version.definition.queries);
                reloadQueries(version.definition.queries).then(() => {
                  updateFlow({ nodes: version.definition.nodes, edges: version.definition.edges });
                });
              }}
              showCreateVersionModalPrompt={false}
              closeCreateVersionModalPrompt={() => {}}
            />
          </div> */}
      </div>
    </div>
  );
};

export default Header;