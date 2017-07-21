/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Track the posting of LID for a document to a customer
 * @param {org.acme.receivables.PostLineItemDetail} post - the LID to be posted
 * @transaction
 */
function postLID(post) {

    // set the owner of the LID
    post.document.owner = post.customer;
    return getAssetRegistry('org.acme.receivables.Document')
        .then(function (assetRegistry) {

            // emit a notification that a LID has been posted
            var postNotification = getFactory().newEvent('org.acme.receivables', 'PostLineItemDetailNotification');
            postNotification.document = post.document;
            emit(postNotification);

            // persist the state of the commodity
            return assetRegistry.update(post.document);
        });
}
