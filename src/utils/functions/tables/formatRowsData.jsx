/*
  Created by François LELIEVRE ©
*/
/* [+] Community imports */
import {
  find,
  isObject,
} from 'lodash';
import {
  reorderObjectKeys,
} from '../objects';

const formatRowsData = ({
  rows = [],
  tableHeaders = [],
  rowDataFormatValueProps = {},
  authUserCanGet = () => false,
  authUserCanList = false,
  authUserCanUpdate = () => false,
  authUserCanUpdateCheckbox = () => false,
  authUserCanDelete = () => false,
  handleMenuEditClick = () => {},
  handleMenuDeleteClick = () => {},
  handleCheckboxClick = () => {},
  generateOtherMenuActions = () => {},
  t = (s) => s,
} = {}) => (
  rows.map(({
    id = '',
    ...props
  }, rowIndex) => {
    const tableHeadersIds = tableHeaders.map(({ id: tableHeaderId }) => tableHeaderId);
    const reorderedProps = reorderObjectKeys({
      originalObject: props,
      orderedKeys: tableHeadersIds,
    });
    return (
      Object.keys(reorderedProps).map((k, keyIndex) => {
        const {
          formatValue = ({ value }) => value,
          populateWithKey = undefined,
          ...restTableHeaderProps
        } = find(tableHeaders, { id: k }) || {};
        const {
          id: tableRowDataId = undefined,
          type: headerType = '',
          label: headerLabel = '',
        } = restTableHeaderProps;
        const rowValue = formatValue({
          value: props[populateWithKey || k],
          ...rowDataFormatValueProps,
        });
        const {
          value: checkboxValue = false,
          cannotBeUpdated = true,
          notApplicable = false,
          collection = '',
          action = '',
          labelIfAuthorized = '',
          labelIfUnauthorized = '',
        } = rowValue || {};
        const checked = checkboxValue;
        const disabled = cannotBeUpdated || !authUserCanUpdateCheckbox({ id, ...props });
        const hasCustomTooltipTitle = (headerType === 'checkbox');
        const tooltipTitle = checkboxValue
          ? t(labelIfAuthorized)
          : t(labelIfUnauthorized);
        const typeIfCheckbox = notApplicable
          ? 'text'
          : 'checkbox';
        const type = (headerType === 'checkbox')
          ? typeIfCheckbox
          : headerType;
        const valueIfCheckbox = rowValue;
        const value = (headerType === 'checkbox')
          ? valueIfCheckbox
          : rowValue;
        const finalId = (headerType === 'checkbox')
          ? `${collection}-${action}`
          : tableRowDataId;
        const finalObject = ({
          key: `${rowIndex}-${keyIndex}`,
          value,
          ...restTableHeaderProps,
          authUserCanGet: authUserCanGet({ id, ...props }),
          authUserCanList,
          authUserCanUpdate: authUserCanUpdate({ id, ...props }),
          authUserCanDelete: authUserCanDelete({ id, ...props }),
          handleMenuEditClick: () => handleMenuEditClick(id),
          handleMenuDeleteClick: () => handleMenuDeleteClick({
            id,
            ...props,
          }),
          otherMenuActions: generateOtherMenuActions({
            id,
            ...props,
          }),
          handleCheckboxClick: () => handleCheckboxClick({
            checkboxId: tableRowDataId,
            value: checkboxValue,
            label: headerLabel,
            id,
            ...props,
          }),
          type,
          checked,
          tooltipTitle,
          hasCustomTooltipTitle,
          disabled,
          id: finalId,
          oldId: k,
        });
        return isObject(value)
          ? {
            ...finalObject,
            ...value,
          } : {
            ...finalObject,
            value,
          };
      }).filter(({ oldId: oldIdOfRowData }) => (
        (typeof oldIdOfRowData === 'string')
        && (
          tableHeadersIds.includes(oldIdOfRowData)
          || oldIdOfRowData === 'icon'
        )
      ))
    );
  })
);

export default formatRowsData;
