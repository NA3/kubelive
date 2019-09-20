'use strict';
const k8sApi = require('../../kube/api');
const mockActions = {
  baseActions: [
    {
      key: 'c',
      description: 'Copy'
    }
  ],
  baseExecuteAction: jest.fn()
};
jest.mock('../../actions/base', () => mockActions);
const { baseExecuteAction } = require('../../actions/base');
const { executeAction } = require('../../actions/replication-controller');

describe('executeAction()', () => {
  beforeEach(() => {
    k8sApi.deleteNamespacedReplicationController = jest
      .fn()
      .mockResolvedValue();
  });

  it('should call k8sApi.deleteNamespacedReplicationController(name, namespace) when key d is pressed', () => {
    const name = 'some-replication-controller-name';
    const namespace = 'some-namespace-name';
    executeAction({ name: 'd' }, name, namespace);

    expect(k8sApi.deleteNamespacedReplicationController).toHaveBeenCalledWith(
      name,
      namespace
    );
  });

  it('should call baseExecute action when nothing matches', () => {
    const keyName = 'some-unknown-key';
    const name = 'some-node-name';
    const namespace = 'some-namespace';
    executeAction({ name: keyName }, name, namespace);

    expect(baseExecuteAction).toHaveBeenCalledWith(
      { name: keyName },
      name,
      namespace
    );
  });

  it('should call baseExecute action when nothing matches', () => {
    const keyName = 'some-unknown-key';
    const name = 'some-node-name';
    const namespace = 'some-namespace';
    executeAction({ name: keyName }, name, namespace);

    expect(baseExecuteAction).toHaveBeenCalledWith(
      { name: keyName },
      name,
      namespace
    );
  });
});
