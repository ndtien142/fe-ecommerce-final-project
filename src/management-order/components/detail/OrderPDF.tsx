import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
// utils
import { fCurrency } from '../../../common/utils/formatNumber';
import { fDate } from '../../../common/utils/formatTime';
// @types
import { IOrder } from '../../../common/@types/order/order.interface';
//
import styles from './OrderStyle';

// ----------------------------------------------------------------------

type Props = {
  order: IOrder;
};

export default function OrderPDF({ order }: Props) {
  if (!order) return null;

  const {
    id,
    status,
    orderedDate,
    deliveredDate,
    address,
    shippingMethod,
    payment,
    lineItems,
    note,
    totalAmount,
    shippingFee,
    createTime,
  } = order;

  const subtotal = lineItems.reduce((sum, item) => sum + Number(item.total), 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <Image source="/logo/logo_full.jpg" style={{ height: 32 }} />
          <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
            <Text style={styles.h3}>{status}</Text>
            <Text>{`ORDER-${id}`}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Giao cho</Text>
            <Text style={styles.body1}>{address?.receiverName}</Text>
            <Text style={styles.body1}>
              {address
                ? `${address.streetNumber} ${address.street}, ${address.ward}, ${address.district}, ${address.city}, ${address.country}`
                : ''}
            </Text>
            <Text style={styles.body1}>{address?.phoneNumber}</Text>
          </View>

          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Phương thức giao hàng</Text>
            <Text style={styles.body1}>{shippingMethod?.name}</Text>
            <Text style={styles.body1}>{shippingMethod?.description}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Ngày đặt hàng</Text>
            <Text style={styles.body1}>{fDate(orderedDate)}</Text>
          </View>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Ngày giao hàng</Text>
            <Text style={styles.body1}>{deliveredDate ? fDate(deliveredDate) : '-'}</Text>
          </View>
        </View>

        <Text style={[styles.overline, styles.mb8]}>Chi tiết đơn hàng</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>#</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Sản phẩm</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Số lượng</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Đơn giá</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>Thành tiền</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableBody}>
            {lineItems.map((item, index) => (
              <View style={styles.tableRow} key={item.id}>
                <View style={styles.tableCell_1}>
                  <Text>{index + 1}</Text>
                </View>
                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle2}>{item.product?.name}</Text>
                  <Text>{item.product?.description}</Text>
                </View>
                <View style={styles.tableCell_3}>
                  <Text>{item.quantity}</Text>
                </View>
                <View style={styles.tableCell_3}>
                  <Text>{fCurrency(item.price)}</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{fCurrency(item.total)}</Text>
                </View>
              </View>
            ))}

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Tạm tính</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{fCurrency(subtotal)}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Phí vận chuyển</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{shippingFee ? fCurrency(shippingFee) : 'Miễn phí'}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.h4}>Tổng cộng</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.h4}>{fCurrency(totalAmount)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.footer]}>
          <View style={styles.col8}>
            <Text style={styles.subtitle2}>Ghi chú</Text>
            <Text>{note || 'Không có ghi chú cho đơn hàng này.'}</Text>
          </View>
          <View style={[styles.col4, styles.alignRight]}>
            <Text style={styles.subtitle2}>Ngày tạo đơn</Text>
            <Text>{fDate(createTime)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
