/**
 * Copyright (C) 2025 Uppli SAS — Billariz
 *
 * This file is part of Billariz, licensed under the GNU Affero General
 * Public License v3.0 (AGPL-3.0). You may use, modify and distribute
 * this software under the terms of the AGPL-3.0.
 *
 * For commercial use without AGPL obligations, contact:
 * contact@billariz.com | contact@uppli.fr
 * https://billariz.com
 */

import PropTypes from 'prop-types';

//Hooks
import { useSelector } from 'react-redux';

// components
import { CustomEditableTable } from '../../../components/table';

//Consts
import ARTICLES_CONFIG from 'src/constants/articles';

// Actions
import {
  dispatchArticleAction,
  getArticles,
  resetEvent,
} from 'src/redux/slices/article';

// ----------------------------------------------------------------------

const columns = ARTICLES_CONFIG.COLUMNS;
const config = ARTICLES_CONFIG.FILTERS;
const forms = ARTICLES_CONFIG.FORMS;

// ----------------------------------------------------------------------

ArticleList.propTypes = {
  billableChargeId: PropTypes.number,
};

export default function ArticleList({ billableChargeId }) {
  const { articles, totalCount, isLoading, currentEvent, error } = useSelector(
    (state) => state.articles
  );

  const initialFilterValues = [];
  if (billableChargeId)
    initialFilterValues.push(['billableChargeId', billableChargeId]);

  return (
    <CustomEditableTable
      config={config}
      rows={articles}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      initialFilterValues={initialFilterValues}
      form={forms}
      currentEvent={currentEvent}
      dispatchCallback={getArticles}
      dispatchEvent={dispatchArticleAction}
      displayDeleteAction={true}
      impliedValues={{ billableChargeId }}
      resetEvent={resetEvent}
      subject="ARTICLE"
      error={error}
    />
  );
}
